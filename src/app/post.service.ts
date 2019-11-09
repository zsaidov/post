import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    url = 'http://jsonplaceholder.typicode.com/posts/';

    constructor(private http: HttpClient) {
    }

    getPosts(): Observable<any> {
        return this.http.get(this.url);
    }

    getPostById(id: number): Observable<any> {
        return this.http.get(this.url + id);
    }
}
