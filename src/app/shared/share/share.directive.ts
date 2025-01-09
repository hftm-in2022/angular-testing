import {
  Directive,
  inject,
  InjectionToken,
  input,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[share]',
  host: {
    '(click)': 'onClick($event)',
  },
  standalone: true,
})
export class ShareDirective {
  share = input.required<{
    title: string;
    commands: [string, number];
    pictureUrl: string;
  }>();

  private window = inject(WINDOW);
  private router = inject(Router);

  navigator: Navigator;

  constructor() {
    this.navigator = window.navigator as Navigator;
  }

  //@HostListener('click', ['$event']) replaced by host binding
  async onClick() {
    if (!navigator.canShare) {
      console.log('navigator.canShare() not supported.');
    }

    const file = await getFileFromUrl(this.share().pictureUrl, 'picture.jpg');

    const shareDate = {
      files: [file],
      title: this.share().title,
      url: new URL(
        this.router.createUrlTree(this.share().commands).toString(),
        this.window.location.origin,
      ).toString(),
    };

    if (this.navigator.canShare(shareDate)) {
      this.navigator.share(shareDate);
    } else {
      console.log('navigator.canShare() not supported.');
    }
  }
}

export const WINDOW = new InjectionToken<Window>('Window', {
  providedIn: 'root',
  factory: () =>
    inject(PLATFORM_ID) === 'browser' ? window : ({ navigator: {} } as Window),
});

async function getFileFromUrl(
  url: string,
  name: string,
  defaultType = 'image/jpeg',
) {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], name, {
    type: data.type || defaultType,
  });
}
