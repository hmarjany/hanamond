import { Comment } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/Auth/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  isLoggedIn: String;
  comment: string;
  currentUser: User;

  @Output() sendCommentEvent = new EventEmitter<string>();
  @Output() moreCommentEvent = new EventEmitter();
  @Input() comments: Array<Comment>;

  constructor(private authenticationService: AuthService) { 
    this.currentUser = this.authenticationService.currentUserValue;
    this.isLoggedIn = this.currentUser && this.currentUser.token;
  }

  ngOnInit(): void {
  }

  sendComment(comment: string){
    this.sendCommentEvent.emit(comment);
  }

  moreComments(){
    this.moreCommentEvent.emit();
  }

}
