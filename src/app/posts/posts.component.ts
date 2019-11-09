import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PostService} from '../post.service';

@Component({
    selector: 'posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    posts: { userId: string, id: string, title: string, body: string }[];

    private initSub: Subscription;

    constructor(private service: PostService) {

    }

    ngOnInit(): void {
        if (this.initSub && !this.initSub.closed) {
            this.initSub.unsubscribe();
        }
        this.initSub = this.service.getPosts()
            .subscribe((data => this.posts = data));
    }

    onPostClick(post: any): void {
        // console.log(post);
    }
}
