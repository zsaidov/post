import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TrackerService {
    url = 'http://kargotest.herokuapp.com/api/trackers/';

    constructor(private http: HttpClient) {
    }

    /**
     * from date
     * to date
     */
    getTrackers(from: string, to: string): Observable<any> {
        return this.http.get(this.url + `?from=${from}&to=${to}`);
    }
}
