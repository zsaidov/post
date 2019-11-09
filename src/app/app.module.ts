import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {PostComponent} from './post/post.component';
import {PostsComponent} from './posts/posts.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
    {path: 'post/:id', component: PostComponent},
    {path: '**', component: PostsComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        PostComponent,
        PostsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
