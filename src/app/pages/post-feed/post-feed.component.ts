import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { CreatePostComponent } from 'src/app/tools/create-post/create-post.component';
@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  posts: PostData[] = [];
  firestore = new FirebaseTSFirestore();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosts();
  }

  onCreatePostClick() {
    this.dialog.open(CreatePostComponent);
  }

  getPosts() {
    this.firestore.getCollection({
      path: ["Posts"],
      where: [
        new OrderBy("timestamp", "desc"),
        new Limit(10)
      ],
      onComplete: (result) => {
        result.docs.forEach(
          doc => {
            let post = <PostData>doc.data();
            post.postId=doc.id;
            this.posts.push(post);
          }
        );
      },
      onFail: err => {

      }
    });
  }
}

export interface PostData {
  comment: string;
  creatorId: string;
  imageUrl?: string;
  postId:string;
  likeId:string;
}
