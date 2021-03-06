import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Comment } from 'src/app/model/Comment';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/Auth/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit ,OnDestroy{

  navigationSubscription;
  isLoggedIn: String;
  comment: string;
  currentUser: User;
  placeHolder = "دیدگاه شما .. چون مهم هستید";
  sendButton = false;
  @Output() sendCommentEvent = new EventEmitter<string>();
  @Output() likeEvent = new EventEmitter<Comment>();
  @Output() dislikeEvent = new EventEmitter<Comment>();
  @Output() moreCommentEvent = new EventEmitter();
  @Input() comments: Array<Comment>;

  constructor(private authenticationService: AuthService,
    private router: Router,) { 
    this.currentUser = this.authenticationService.currentUserValue;
    this.isLoggedIn = this.currentUser && this.currentUser.token;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  
  initialiseInvites() {
    this.placeHolder = "دیدگاه شما .. چون مهم هستید";
    this.sendButton = false;
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  like(comment: Comment){
    if(this.authenticationService.currentUserValue === undefined || this.authenticationService.currentUserValue === null){
      return;
    }
    this.likeEvent.emit(comment);
  }

  dislike(comment: Comment){
    if(this.authenticationService.currentUserValue === undefined || this.authenticationService.currentUserValue === null){
      return;
    }
    this.dislikeEvent.emit(comment);
  }
  ngOnInit(): void {
    
    if(this.comments != undefined && this.comments != null && this.comments.length > 0){
      this.comments.forEach(item =>{
        if(item.like === undefined || item.like === null){
          item.like = 0;
        }
        if(item.dislike === undefined || item.dislike === null){
          item.dislike = 0;
        }
      })
    }
  }

  sendComment(comment: string){
    if(comment === '' || comment === null || comment === undefined){
      return;
    }
    this.sendCommentEvent.emit(comment);
    this.comment = '';
    this.placeHolder = "دیدگاه شما ارسال شد";
    this.sendButton = true;
  }

  moreComments(){
    this.moreCommentEvent.emit();
  }

}
