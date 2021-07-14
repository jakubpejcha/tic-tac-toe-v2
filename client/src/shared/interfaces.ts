export interface CellInterface {
	showClassName: string,
	takenByPlayer: string,
	winning: boolean
};

export interface ScoreInterface {
	[index: string]: number,
	x: number,
	o: number
}