const SpotifyWebApi = require('spotify-web-api-node');
const mongoose = require('mongoose');
const tf = require('@tensorflow/tfjs-node');



const spotifyApi = new SpotifyWebApi({
  clientId: '9f0b2038f4eb4d5883a3a763f41af17b',
  clientSecret: 'b369a26265744c70900c28fef832b8d2',
  redirectUri: 'https://www.getpostman.com/oauth2/callback'
});

spotifyApi.setAccessToken('BQC7NQ6pQdY8p36p08l8ogPCmV-VjVx3Uh_-GD6QmZcTDkyeIZRn2-39sACatdU8IbuxIUvMD1Hr_ojs-pKwUxVt1R7qjv1r5GPi6DGQbtwdSgNTXGVkV8vUJIdQMDDT8LRXbi8ZjYK9cMcfdjIHPopWzliXvYsFSswoyXO-Qsi88vHx1TIpaS2vbE4KaYPSfPI-pPbynrd-8bs');

/*
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});




const track = new Schema({
  author: String,
  song: String,
  time_signature : Decimal128,
  acousticness : Decimal128,
  danceability :Decimal128,
  energy : Decimal128,
  instrumentalness : Decimal128,
  liveness : Decimal128,
  loudness : Decimal128,
  speechiness : Decimal128,
  valence : Decimal128,
  tempo : Decimal128,
  id : String
});
*/



let data_offset = 0;
let max_songs = 9800;
let features = [];
let tracks_name = [];
let labels = []
let done = false;
let k = 20;
let jsonData = {}
let target = ['3XVBdLihbNbxUwZosxcGuJ'];

let req_path = 'https://api.spotify.com/v1/playlists/7htu5ftbLBRFAwiuHVcUAg';
//
// getTargetTrackFeatures(target);
// getPlaylistTrackIDs('https://api.spotify.com/v1/playlists/7htu5ftbLBRFAwiuHVcUAg');
//


async function asyncgetPlaylistTrackIDsDriver(playlist_path) {
  await asyncgetPlaylistTrackIDs(playlist_path);
  return [features, labels, tracks_name]

}


async function asyncgetPlaylistTrackIDs(playlist_url) {
	let playlist_id = playlist_url.substring(37, 59);
		// Get tracks in a playlist
		let data = await spotifyApi.getPlaylistTracks(playlist_id, { offset: data_offset, limit: 100 })
    // onsole.log("STARTINGGG2", data);
		 data = (() =>  {
      // console.log("STARTINGGG3", data);

		    	let items = data.body['items'];
		    	let temp_track_ids = [];

		    	for(let i = 0; i < items.length; i++) {
					let artists = items[i]['track']['artists'][0]['name'];
					let album = items[i]['track']['album']['name'];
			    	let name = items[i]['track']['name'];
			    	let id = items[i]['track']['id'];
			    	tracks_name.push({artists: artists, name: name, album: album, id: id});
			    	labels.push(id);
			    	temp_track_ids.push(id);
					// console.log("Track: " + (data_offset + i) + " Artist: " + artists + " Song: " + name + " Album: " + album + " Id: " + id);
	    		}

	    		data_offset += 100
	    		//console.log('The playlist contains these tracks'+ data.body['next']);
	     		return [temp_track_ids, data.body['next']];
    })()

	   if(data[1] == null || data_offset >= max_songs) {
       done = true;
    }

		 await getTrackFeatures(data[0]);


			if(data[1] != null && data_offset < max_songs) {
				await asyncgetPlaylistTrackIDs(data[1]);
			}

		return [features, labels, tracks_name];
};




//returns array of playlist ids eg. ['1fskj2348234987sfds', '2fjkhsd23jr23423', '1fskj2348234987sfds', '2fjkhsd23jr23423']
function getPlaylistTrackIDs(playlist_url) {
	let playlist_id = playlist_url.substring(37, 59);
		// Get tracks in a playlist
		spotifyApi.getPlaylistTracks(playlist_id, { offset: data_offset, limit: 100 })
		.then( function(data) {
		    	let items = data.body['items'];
		    	let temp_track_ids = [];

		    	for(let i = 0; i < items.length; i++) {
					let artists = items[i]['track']['artists'][0]['name'];
					let album = items[i]['track']['album']['name'];
			    	let name = items[i]['track']['name'];
			    	let id = items[i]['track']['id'];
			    	tracks_name.push([artists, name, album, id]);
			    	labels.push(id);
			    	temp_track_ids.push(id);
					//console.log("Track: " + (data_offset + i) + " Artist: " + artists + " Song: " + name + " Album: " + album + " Id: " + id);
	    		}

	    		data_offset += 100
	    		//console.log('The playlist contains these tracks'+ data.body['next']);
	     		return [temp_track_ids, data.body['next']];

	    }).then(function(data){
	    		//console.log("starign11111")
	    		if(data[1] == null || data_offset >= max_songs) done = true;
		  		getTrackFeatures(data[0]);
		  	return data;
		}).then(function(data){
			//console.log("starign2222222")
			if(data[1] != null && data_offset < max_songs) {
				getPlaylistTrackIDs(data[1]);
			}
			return data;
		}).then(function(data){
			if(done) {s
        console.log("SENDING INFOOOO")
        console.log("features:", features.length, "labels", labels.length, "tracks_name", tracks_name.length);
				return [features, labels, tracks_name];
      }
		}).catch(function(err) {
			console.error('Error occurred: ' + err);
		});
};




//returns 2D array of track features
async function getTrackFeatures(playlist_ids_arr){
	let data = await spotifyApi.getAudioFeaturesForTracks(playlist_ids_arr)
  let items = data.body['audio_features'];
  for(let track_indx = 0; track_indx < items.length; track_indx++) {
  	let track_arr = []
  	for(let audio_feature in items[track_indx]) {
  		if(audio_feature == 'acousticness' || audio_feature == 'danceability' || audio_feature == 'energy' || audio_feature == 'instrumentalness' || audio_feature == 'liveness' || audio_feature == 'loudness' || audio_feature == 'speechiness' || audio_feature == 'valence' || audio_feature == 'tempo') {
  			let val = items[track_indx][audio_feature]
    		if(audio_feature == 'loudness') {
	    		val = Math.abs(val /= 60.0);
    		} else if(audio_feature == 'tempo') {
    			val /= 225.0;
    		}
    		track_arr.push(val);
    	}
  	}
  	features.push(track_arr);
  }
}

//returns 2D array of track features
async function getTargetTrackFeatures(playlist_id){
  console.log("STARTINGGGG")

  let target_features = [];

  playlist_ids_array = [playlist_id]
	let data = await spotifyApi.getAudioFeaturesForTracks(playlist_ids_array)

  let items = data.body['audio_features'];
  for(let track_indx = 0; track_indx < items.length; track_indx++) {
  	let track_arr = []
  	for(let audio_feature in items[track_indx]) {
  		if(audio_feature == 'acousticness' || audio_feature == 'danceability' || audio_feature == 'energy' || audio_feature == 'instrumentalness' || audio_feature == 'liveness' || audio_feature == 'loudness' || audio_feature == 'speechiness' || audio_feature == 'valence' || audio_feature == 'tempo') {
  			let val = items[track_indx][audio_feature]
    		if(audio_feature == 'loudness') {
	    		val = Math.abs(val /= 60.0);
    		} else if(audio_feature == 'tempo') {
    			val /= 225.0;
    		}
    		target_features.push(val);
    	}
  	}
  }
  return target_features
}


// //returns 2D array of track features
// function getTargetTrackFeatures(playlist_id){
//   playlist_ids_array = [playlist_id]
// 	spotifyApi.getAudioFeaturesForTracks(playlist_ids_array)
// 	  .then(function(data) {
// 	    let items = data.body['audio_features'];
// 	    for(let track_indx = 0; track_indx < items.length; track_indx++) {
// 	    	let track_arr = []
// 	    	for(let audio_feature in items[track_indx]) {
// 	    		if(audio_feature == 'acousticness' || audio_feature == 'danceability' || audio_feature == 'energy' || audio_feature == 'instrumentalness' || audio_feature == 'liveness' || audio_feature == 'loudness' || audio_feature == 'speechiness' || audio_feature == 'valence' || audio_feature == 'tempo') {
// 	    			let val = items[track_indx][audio_feature]
// 		    		if(audio_feature == 'loudness') {
// 			    		val = Math.abs(val /= 60.0);
// 		    		} else if(audio_feature == 'tempo') {
// 		    			val /= 225.0;
// 		    		}
// 		    		target_features.push(val);
// 		    	}
// 	    	}
// 	    }
// 	  }, function(err) {
// 	  	console.log("ERROR: " + err);
// 	  }).then(function(data) {
// 	  	console.log("Done: " + done);
// 	  });
// }


async function runTensor(target_features, playlist_features, playlist_labels, playlist_labels_index, k) {

	tffeatures = tf.tensor(playlist_features);
	tflabels = tf.tensor(playlist_labels_index).expandDims(1);
	tfpred = tf.tensor(target_features);
	let arr = await getKNN(tfpred, tffeatures, tflabels, k);

  let recommended_songs = []
	for(let i = 0; i < arr.length; i++) {
		console.log("Song" + i + ":", playlist_labels[arr[i].arraySync()[1]], "DIfference: ", arr[i].arraySync()[0]);
    recommended_songs.push(arr[i].arraySync()[1])
  }
  return recommended_songs
}


function getKNN(predicitionPoint, features, labels, k) {
	return features.sub(predicitionPoint).pow(2).sum(1).sqrt().expandDims(1).concat(labels, 1).unstack().sort((a, b) => {

		return a.arraySync()[0] - b.arraySync()[0] }) .slice(0,k);
}


module.exports = {
  asyncgetPlaylistTrackIDsDriver,
  asyncgetPlaylistTrackIDs,
  getPlaylistTrackIDs,
  getTargetTrackFeatures,
  runTensor
}
