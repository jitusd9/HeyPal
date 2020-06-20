import React from 'react'
import { getProfilePicUrl } from '../utils/FirebaseAuth'

export default function ShowComment() {
    return (
        <div>
            <div className="show-comments">
                        <div className="comment-tab">
                            <div className="user">
                                <div className="dp">
                                    <img src={getProfilePicUrl()} alt="user_dp"/>
                                </div>
                                <div className="comment">
                                    <p>this is previous comment</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
        </div>
    )
}
