import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-services',
  templateUrl: './home-services.component.html',
  styleUrls: ['./home-services.component.scss'],
})
export class HomeServicesComponent {
  activeIndex: number = 0;
  activeTypeCode: string = 'WEBT001';
  contents: any[] = [
    {
      typeCode: 'WEBT001',
      title: 'Тоглуулагч',
      icon: 'assets/images/icon1.png',
      info: null,
      image: null,
    },
    {
      typeCode: 'WEBT002',
      title: 'Өсгөгч',
      icon: 'assets/images/icon7.png',
      info: null,
      image: null,
    },
    {
      typeCode: 'WEBT003',
      title: 'Яригч',
      icon: 'assets/images/icon3.png',
      info: null,
      image: null,
    },
    {
      typeCode: 'WEBT004',
      title: 'Микрофон',
      icon: 'assets/images/icon5.png',
      info: null,
      image: null,
    },
    {
      typeCode: 'WEBT005',
      title: 'Удирдлага',
      icon: 'assets/images/icon4.png',
      info: null,
      image: null,
    },
    {
      typeCode: 'WEBT006',
      title: 'Дагалдах хэрэгсэл',
      icon: 'assets/images/icon1.png',
      info: null,
      image: null,
    },
  ];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const array = this.activatedRoute.snapshot.data['item'].contents;
    this.contents = this.contents.map((content) => {
      const matchingData = array.find((item: any) => item.typeCode === content.typeCode);
      if (matchingData) {
        return {
          ...content,
          info: matchingData.info,
          image: matchingData.filePath,
        };
      }
      return content;
    });
  }

  setActive(index: number, typeCode: string): void {
    this.activeIndex = index;
    this.activeTypeCode = typeCode;
  }
}
