import React, { Component } from "react";
import firebase from "../../Firebase";
import { getUserId } from "./FirebaseAuth";

export class Addpost extends Component {
	constructor() {
		super();
		this.ref = firebase.firestore().collection("posts");
		this.storage = firebase.storage();
		this.unsubscribe = null;
		this.state = {
			content: "",
			image: null,
			url: "",
			progress: 0,
			imageUploading: false,
			btnClass: "tert-btn post-btn hide-btn",
			tempImgSrc : ""
		};
	}

	onChange = (e) => {
		if (e.target.value !== "") {
			this.setState({
				btnClass: "tert-btn post-btn",
			});

			const state = this.state;
			let str = e.target.value;
			str = str.replace(/^\s+/, " ");

			state[e.target.name] = str;
			this.setState({
				state: str,
			});
		} else {
			this.setState({
				btnClass: "tert-btn post-btn hide-btn",
				content: "",
			});
		}
	};

	imageChange = (e) => {
	    if(e.target.files[0]){
			const image = e.target.files[0];
			let tempSrc;
			const reader = new FileReader();
	        this.setState({
				image,
				btnClass : "tert-btn post-btn",
				tempImgSrc : ''
			})
			
			// file reader 
			reader.onloadend = function(){
				tempSrc = reader.result
				console.log('tempSrc :', tempSrc);
			}
				
			if(image){
				reader.readAsDataURL(image);
			}else{
				tempSrc = "";
			}

			setTimeout(() => {
				this.setState({
					tempImgSrc : tempSrc
				})
				console.log('tempSrc outside:', tempSrc);
			}, 1000);
			

	    }else{
	        console.log('imageChange Error');
		}
	}

	handleImage = () => {
			this.setState({
				imageUploading: true,
			});

			// image uplaod
			const { image } = this.state;
			const uid = getUserId();
			console.log('image from state ', image);
			

			return new Promise((resolve, reject) => {

				if(image === null) {
					resolve(null)
				}else{
					const uploadTask = this.storage
					.ref(`images/${uid}/${image.name}`)
					.put(image);
					// console.log( typeof uploadTask);

					uploadTask.on(
						"state_changed",
						(snapshot) => {
							// progress function
							console.log(snapshot);
							const progress = Math.round(
								(snapshot.bytesTransferred / snapshot.totalBytes) * 100
							);
							this.setState({ progress });
						},
						(error) => {
							// error function
							console.log('handleimg Err :', error);
							reject(error);
						},
						() => {
							// complete function
							this.storage
								.ref(`images/${uid}`)
								.child(image.name)
								.getDownloadURL()
								.then((url) => {
									console.log(url);
									this.setState({
										url,
										image: null,
									});
									resolve(url);
								})
								.catch(err => console.log('Error getting Download Url :', err));
						}
					);

				}

			});

			

			// unsubscribe();
		
	};

	uploadPost = (imgUrl) => {
		const { content } = this.state;
		// text uplaod

		this.unsubscribe = this.ref
			.add({
				userId: getUserId(),
				content,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				photos: imgUrl,
			})
			.then((docRef) => {
				// console.log(`PostId :`,docRef.id);
				this.setState({
					btnClass: "tert-btn post-btn",
				})

				this.setState({
					userId: "",
					content: "",
					timestamp: "",
					photos: null,
				});
			})
			.catch((err) => console.log("Error Adding Document: ", err));

	}

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.content === "" && this.state.image === null) {
			return alert("plese write something!");
		}
		this.setState({
			btnClass: "tert-btn post-btn hide-btn",
			tempImgSrc : ""
		})

		this.handleImage()
		.then(img => {
			this.setState({
				imageUploading: false,
			});
	
			console.log('from OnSubmit img(url) :', img);

			this.uploadPost(img);
		})
		.catch(error => {
			console.log('from OnSubmit err :', error);
			this.setState({
				btnClass: "tert-btn post-btn",
			})
		})
		

	};

	render() {
		const { imageUploading , tempImgSrc} = this.state;

		let progressBar = imageUploading ? (
			<progress value={this.state.progress} max="100" />
		) : null;

		let previewImage = tempImgSrc !== "" ? <img className="previewImage" src={tempImgSrc} alt="preview" /> : null

		return (
			<div className="post-card">
				<form onSubmit={this.onSubmit}>
					<label htmlFor="post" className="add-content">
						<textarea
							onChange={this.onChange}
							id="post"
							name="content"
							value={this.state.content}
							placeholder="type here something..."
						/>
						{ previewImage }
						{ progressBar }
					</label>
					<div className="bottom-bar">
						<label className="tert-btn" htmlFor="img-input">
							{" "}
							<span title="Upload Image" role="img" aria-label="icon">
								📷
							</span>
							<input
								onChange={this.imageChange}
								id="img-input"
								value=""
								name="pic"
								type="file"
								multiple="multiple"
							/>
						</label>
						<button
							className={this.state.btnClass}
							type="submit"
							value="submit"
						>
							Post
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Addpost;
