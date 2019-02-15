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
    hideDragGhost?: boolean;
    onMarked: (text: string, startIdx: number, endIdx: number, begin?: HTMLElement, end?: HTMLElement) => void;
}
