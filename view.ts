import {ItemView, WorkspaceLeaf} from 'obsidian';
import SearchOnInternetPlugin from './main';

export class SearchView extends ItemView {
    url: string;
    title: string;
    plugin: SearchOnInternetPlugin;

    frame: HTMLElement;

    constructor(plugin: SearchOnInternetPlugin, leaf: WorkspaceLeaf, url: string, title: string) {
      super(leaf);
      this.plugin = plugin;
      this.url = url;
      this.title = title;
    }

    async onOpen() {
      this.frame = document.createElement('iframe');
      this.frame.addClass(`soi-site`);
      this.frame.setAttr('style', 'height: 100%; width:100%');
      this.frame.setAttr('src', this.url);
      this.frame.setAttr('tabindex', '0');
      this.containerEl.children[1].appendChild(this.frame);


      // Turns out IFrames are very hard to control the contextmenu of. So leaving this for now!
      // this.frame.addEventListener('contextmenu', (e) => {
      //   console.log('asdf');
      //   this.plugin.handleContext(e, this);
      // });
    }

    getDisplayText(): string {
      return `Wiki: ${this.url}`;
    }
    
    getViewType(): string {
      return 'Search on Internet';
    }
}
