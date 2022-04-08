import { Component, Input, OnInit, Inject } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';
import { DatePipe } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';

import { doc, getDoc, getFirestore, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  replycount: number;
  creatorName: string;
  creatorDescription: string;
  ti: firebase.default.firestore.Timestamp;

  timestamp: firebase.default.firestore.Timestamp
  count!: number;

  fav: string = "favorite_border";
  db = getFirestore();


  @Input() postData: PostData;
  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getCreatorInfo();
    this.getInitLike();
  }
  async getInitLike() {
    const likesSnap = await getDoc(doc(this.db, "Likes", this.postData.postId));
    if (!likesSnap.exists()) {
      await setDoc(doc(this.db, "Likes", this.postData.postId),
        {
          like: 0
        }
      );
    }
    const feelRef = doc(this.db, "Feelings", this.postData.postId + AppComponent.userDocument.userId);
    const feelSnap = await getDoc(feelRef);
    console.log(feelSnap.data());
    if (feelSnap.exists()) {
      let feel: Feel = <Feel>feelSnap.data();
      let curState: number = feel.state;
      if (curState == -1) {
        this.fav = "favorite_border";
      }
      else {
        this.fav = "favorite";
      }
    }

    const unsub = onSnapshot(doc(this.db, "Likes", this.postData.postId), (doc) => {
      this.count = <number>doc.data()!['like'];
    });

  }

  async onLikeClick() {
    //new code added for like button ....
    const feelRef = doc(this.db, "Feelings", this.postData.postId + AppComponent.userDocument.userId);
    const feelSnap = await getDoc(feelRef);
    const likesSnap = await getDoc(doc(this.db, "Likes", this.postData.postId));
    if (feelSnap.exists()) {
      let feel: Feel = <Feel>feelSnap.data();
      let curState: number = feel.state;
      let like: number;

      if (!likesSnap.exists()) {
        await setDoc(doc(this.db, "Likes", this.postData.postId),
          {
            like: 0
          }
        );
        like = 0;
      }
      else {
        like = <number>likesSnap.data()["like"];
      }

      if (curState === -1) {
        curState = 1;
        await updateDoc(feelRef, {
          state: curState
        });
        this.fav = "favorite";
      }
      else {
        curState = -1;
        await updateDoc(feelRef, {
          state: curState
        });
        this.fav = "favorite_border";
      }
      await updateDoc(doc(this.db, "Likes", this.postData.postId), {
        like: like + curState
      });
    }
    else {
      await setDoc(doc(this.db, "Feelings", this.postData.postId + AppComponent.userDocument.userId),
        {
          state: 1
        }
      );
      let like: number;
      if (!likesSnap.exists()) {
        await setDoc(doc(this.db, "Likes", this.postData.postId),
          {
            like: 0
          }
        );
        like = 0;
      }
      else {
        like = <number>likesSnap.data()["like"];
      }
      await updateDoc(doc(this.db, "Likes", this.postData.postId), {
        like: like + 1
      });
      this.fav = "favorite";
    }
  }

  onReplyClick() {
    this.dialog.open(ReplyComponent, { data: this.postData.postId });
  }
  getCreatorInfo() {
    this.firestore.getDocument(
      {
        path: ["Users", this.postData.creatorId],
        onComplete: result => {
          let userDocument = result.data();
          this.creatorName = userDocument.publicName;
          this.creatorDescription = userDocument.publicDescription;
          this.ti = FirebaseTSApp.getFirestoreTimestamp()
        }
      }
    );
  }
  // toggle = true;
  // numberOfLikes: number = 0;
  // numberOfDislikes: number = 0;
  // likeButtonAction() {
  //   this.numberOfLikes++;
  //   this.toggle = !this.toggle;
  // }
  // dislikButtoneAction() {
  //   if (this.numberOfLikes > 1) {
  //     this.numberOfLikes--;
  //     this.numberOfDislikes++;
  //   }
  // }

}

export interface Feel {
  state: number;
}

