import { MarkeeConfig } from "./selection-marker-config";

let defaultConfig = {
    initialText: 'I am a sample text, you can highlight me!',
    startIdx: 0,
    endIdx: 1,
    markerClass : 'marker',
    tokenClass : 'token',
    beginClass : 'begin',
    endClass : 'end',
    selectedClass : 'selected',
    draggedClass : 'dragged',
    hideDragGhost: false
}

export class Markee {
    private begin: Marker;
    private end: Marker;
    private dragged: Marker;
    constructor(private el: HTMLElement, 
        private config: MarkeeConfig) {
        this.config = Object.assign({}, defaultConfig, this.config);
        this.createTokens();
        this.initContainer();
        this.initDragEvents();
        this.initClickEvents();
        this.updateSelectedChildren();
    }

    private initContainer() {
        this.el.style.display = 'flex';
        this.el.style.userSelect = 'none';
        this.begin = this.createMarker(true, this.config.startIdx*2);
        this.end = this.createMarker(false, this.config.endIdx*2);
        this.el.appendChild(this.begin.node);
        this.el.appendChild(this.end.node);
    }

    private createTokens() {
        this.el.innerHTML = this.config.initialText
            .split(' ')
            .map((t, idx) => {
                let order = idx*2 + 1;
                let selectedClass = (idx >= this.config.startIdx && idx < this.config.endIdx)
                    ? this.config.selectedClass : '';
                return `<div class="${this.config.tokenClass} ${selectedClass}" data-order=${order} style="order:${order}">` + 
                    `${t}</div>`
            })
            .join('');    
    }

    private initDragEvents() {
        this.el.addEventListener('dragstart', (e) => {
            let target: HTMLElement = <HTMLElement>e.target;
            if(target.classList.contains(this.config.markerClass)) {
                this.dragged = (target.id === this.config.beginClass) ? this.begin : this.end;
                if(this.config.hideDragGhost) {
                    target.style.opacity = '0';
                    e.dataTransfer.setDragImage(target, 0, 0);
                }
                // Just to keep Firefox happy.
                e.dataTransfer.setData('Text', 'random');
                e.dataTransfer.setData("text/plain", target.id);
                setTimeout(() => {
                    target.style.opacity = '1';
                    target.classList.add(this.config.draggedClass)
                });
            }
        });

        this.el.addEventListener('dragenter', e => {
            let target: any = e.target;
            if(this.dragged && this.isToken(target)) {
                let order = Number.parseInt(target.dataset.order);
                if(this.dragged === this.begin && order + 1 <= this.end.order) {
                    this.updateSelection(this.dragged, order - 1, target);
                } else if(this.dragged === this.end && order - 1 >= this.begin.order) {
                    this.updateSelection(this.dragged, order + 1, target);
                }
            }
        });

        this.el.addEventListener('dragend', (e) => {
            let target: any = e.target;
            target.classList.remove(this.config.draggedClass);
            this.dragged = null;
        });
    }

    private initClickEvents() {
        this.el.addEventListener('click', (evt) => {
            let target: any = evt.target;
            if(this.isToken(target)) {
                let order = Number.parseInt(target.dataset.order);
                this.begin.order = order - 1;
                this.begin.node.style.order = '' + this.begin.order;
                this.end.order = order + 1;
                this.end.node.style.order = '' + this.end.order;
                this.updateSelectedChildren();
            }
        });
    }

    private isToken(target): boolean {
        return target.classList.contains(this.config.tokenClass);
    }

    private updateSelection(dragged: Marker, order: number, target: HTMLElement) {
        dragged.node.style.order = '' + order;
        dragged.order = order;
        this.updateSelectedChildren();
    }

    private updateSelectedChildren() {
        let selectedText = '';
        let startIdx = this.begin.order / 2;
        let endIdx = this.end.order / 2;
        Array.from(this.el.children).forEach((child, idx) => {
            if(idx >= startIdx && idx < endIdx) {
                child.classList.add(this.config.selectedClass);
                selectedText += ' ' + child.textContent;
            } else {
                child.classList.remove(this.config.selectedClass);
            }
        });
        this.config.onMarked(
            selectedText, startIdx, endIdx - 1,
            this.begin.node, this.end.node
        );
    }

    private createMarker (isBegin: boolean = false, order: number) {
        let container = document.createElement('div');
        let id = (isBegin ? this.config.beginClass : this.config.endClass);
        container.innerHTML = `<div draggable=true class="${this.config.markerClass} ${id}"` +
            ` id=${id} style="order:${order}"></div>`;
        let node = <HTMLElement>container.firstElementChild;
        return {
            node: node,
            order: order,
            isBegin: isBegin
        };
    }
}

interface Marker {
    node: HTMLElement;
    isBegin: boolean;
    order: number;
}
