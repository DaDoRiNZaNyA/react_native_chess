import {Colors} from '../Color';
import {Figure, FigureNames} from './Figure';
import {Cell} from '../Cell';

const blackLogo = require('../../assets/black-pawn.png');
const whiteLogo = require('../../assets/white-pawn.png');

export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    if (
      (target.y === this.cell.y + direction ||
        (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      if (this.isFirstStep) {
        const cellsBetween = this.getCellsBetween(this.cell, target);
        if (cellsBetween.some(cell => !cell.isEmpty())) {
          return false;
        }
      }
      return true;
    }

    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }

    return false;
  }

  private getCellsBetween(startCell: Cell, endCell: Cell): Cell[] {
    const cells: Cell[] = [];
    const {x: startX, y: startY} = startCell;
    const {x: endX, y: endY} = endCell;
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.max(Math.abs(dx), Math.abs(dy));
    const stepX = dx / distance;
    const stepY = dy / distance;

    for (let i = 1; i < distance; i++) {
      const x = startX + stepX * i;
      const y = startY + stepY * i;
      const cell = this.cell.board.getCell(x, y);
      cells.push(cell);
    }

    return cells;
  }

  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}
