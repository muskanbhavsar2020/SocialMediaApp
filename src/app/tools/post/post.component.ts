import { Component, Input, OnInit ,Inject} from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';
import { DatePipe } from '@angular/common';

import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  firestore = new FirebaseTSFirestore();
  creatorName:string;
  creatorDescription:string;
  ti:firebase.default.firestore.Timestamp;

  timestamp:firebase.default.firestore.Timestamp
 
  @Input() postData: PostData;
  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getCreatorInfo();
  }
 
    
  onReplyClick(){
    this.dialog.open(ReplyComponent,{data:this.postData.postId});
  }
  getCreatorInfo(){
    this.firestore.getDocument(
      {
        path:["Users",this.postData.creatorId],
        onComplete:result=>{
          let userDocument=result.data();
          this.creatorName=userDocument.publicName;
          this.creatorDescription=userDocument.publicDescription;
          this.ti=FirebaseTSApp.getFirestoreTimestamp()
        }
      }
    );
  }
  toggle=true;
  numberOfLikes:number = 0;
  numberOfDislikes:number = 0; 
  likeButtonAction(){
      this.numberOfLikes++;
      this.toggle = !this.toggle;
  }
  dislikButtoneAction(){
    if(this.numberOfLikes > 1)
    {
    this.numberOfLikes--;
    this.numberOfDislikes++;
    }
  }
}

