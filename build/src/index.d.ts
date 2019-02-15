import { MarkeeConfig } from "./selection-marker-config";
export declare class Markee {
    private el;
    private config;
    private begin;
    private end;
    private dragged;
    constructor(el: HTMLElement, config: MarkeeConfig);
    private initContainer;
    private createTokens;
    private initDragEvents;
    private initClickEvents;
    private isToken;
    private updateSelection;
    private updateSelectedChildren;
    private createMarker;
}
