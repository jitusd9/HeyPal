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

	// imageChange = (e) => {
	//     if(e.target.files[0]){
	//         const image = e.target.files[0];
	//         this.setState({image})
	//         // console.log('image state ', this.state.image.name, '& img upload');

	//         return this.handleImage();

	//     }else{
	//         console.log('imageChange Error');
	//     }
	// }

	handleImage = (e) => {
		e.preventDefault();
		if (e.target.files[0]) {
			const image = e.target.files[0];
			//    this.setState({image})
			this.setState({
				image,
				imageUploading: true,
			});

			// image uplaod

			// const { image } = this.state;
			const uid = getUserId();

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
					console.log(error);
				},
				() => {
					// complete function
					this.storage
						.ref("images")
						.child(image.name)
						.getDownloadURL()
						.then((url) => {
							// console.log(url);
							this.setState({
								url,
								image: null,
							});
						});
				}
			);

			// unsubscribe();
		}
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.content === "" && this.state.image === null) {
			return alert("plese write something!");
		}

		const { content } = this.state;

		this.setState({
			imageUploading: false,
		});

		// text uplaod

		this.unsubscribe = this.ref
			.add({
				userId: getUserId(),
				content,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				photos: this.state.url,
			})
			.then((docRef) => {
				// console.log(`PostId :`,docRef.id);

				this.setState({
					userId: "",
					content: "",
					timestamp: "",
					photos: null,
				});
			})
			.catch((err) => console.log("Error Adding Document: ", err));
	};

	render() {
		const { imageUploading } = this.state;

		let progressBar = imageUploading ? (
			<progress value={this.state.progress} max="100" />
		) : null;

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
						{progressBar}
					</label>
					<div className="bottom-bar">
						<label className="tert-btn" htmlFor="img-input">
							{" "}
							<span title="Upload Image" role="img" aria-label="icon">
								📷
							</span>
							<input
								onChange={this.handleImage}
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
