// /models/ImageCarouselModel.ts

export class ImageCarouselModel {
    private currentIndex: number = 0;
    private isPaused: boolean = false;
    private images: string[];

    constructor(images: string[]) {
        this.images = images;
    }

    public getCurrentIndex() {
        return this.currentIndex;
    }

    public setCurrentIndex(index: number) {
        this.currentIndex = index;
    }

    public getIsPaused() {
        return this.isPaused;
    }

    public setIsPaused(paused: boolean) {
        this.isPaused = paused;
    }

    public getImages() {
        return this.images;
    }

    public goToNextSlide() {
        this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    }
}
