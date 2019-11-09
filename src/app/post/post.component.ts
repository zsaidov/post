import {Component, OnDestroy} from '@angular/core';
import {PostService} from '../post.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {TrackerService} from './tracker.service';

export interface Tracker {
    id: number;
    hits: number;
    date: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    providers: [TrackerService]
})
export class PostComponent implements OnDestroy {
    selectedId: number;
    model: { fromDate: string, toDate: string } =
        {
            fromDate: '2015-01-01',
            toDate: '2015-03-01'
        };

    trackers: Tracker[];
    post: Post;

    private postSub: Subscription;
    private trackSub: Subscription;

    constructor(private service: PostService,
                private trackerService: TrackerService,
                private route: ActivatedRoute) {
        this.init();
        this.onFilterTracker();
    }

    /**
     * filter with date
     */
    onFilterTracker(): void {
        if (this.trackSub && !this.trackSub.closed) {
            this.trackSub.unsubscribe();
        }
        this.trackSub = this.trackerService.getTrackers(this.model.fromDate, this.model.toDate)
            .subscribe(res => {
                this.trackers = sortTrackers(res.data);
                console.log(res.data);
            });
    }

    ngOnDestroy(): void {
        if (this.postSub && !this.postSub.closed) {
            this.postSub.unsubscribe();
        }
        this.model = null;
        this.trackers = null;
        this.post = null;
        this.postSub = null;
        this.trackSub = null;
    }

    /**
     * load message
     */
    private init(): void {
        this.selectedId = +this.route.snapshot.params['id'] || 0;
        if (this.postSub && !this.postSub.closed) {
            this.postSub.unsubscribe();
        }
        this.postSub = this.service.getPostById(this.selectedId)
            .subscribe(data => {
                this.post = data;
                this.post.title = data.title.substr(0, 1).toUpperCase() + data.body.substr(1);
                this.post.body = data.body.substr(0, 1).toUpperCase() + data.body.substr(1);
            });
    }

}

/**
 *
 */
function sortTrackers(data: Tracker[]): Tracker[] {
    if (!data.length) {
        return [];
    }
    const sortData = data.sort((a, b) => a.id - b.id);
    for (let i = 0; i < sortData.length; i++) {
        const nextData = sortData[i + 1];
        const item = sortData[i];
        if (nextData && nextData.id - item.id > 1) {
            createEmptyTrack(sortData, item, i, nextData.id - item.id);
        }
    }
    return sortData;
}

/**
 * create empty tracker
 */
function createEmptyTrack(data, item, index, len): void {
    for (let j = 1; j < len; j++) {
        const oneDay = j * 24 * 60 * 60 * 1000;
        const d1 = new Date(item.date);
        const nextDey = d1.getTime() + oneDay;
        const d2 = new Date(nextDey);
        const track: Tracker = {id: item.id + j, hits: 0, date: d2.toISOString().substring(0, 10)};
        data.splice(j + index, 0, track);
    }
}
