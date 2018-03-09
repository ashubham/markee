export interface MarkeeConfig {
    initialText: string;
    startIdx: number;
    endIdx: number;
    markerClass?: string;
    tokenClass?: string;
    beginClass?: string;
    endClass?: string;
    selectedClass?: string;
    draggedClass?: string;
    onMarked: (text: string,
        startIdx: number,
        endIdx: number) => void;
    onDrag?: (begin: HTMLElement, 
              end: HTMLElement) => void;
}