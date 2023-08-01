import {Colors} from '../Color';
import {Figure, FigureNames} from './Figure';
import {Cell} from '../Cell';

const blackLogo = require('../../assets/black-bishop.png');
const whiteLogo = require('../../assets/white-bishop.png');

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }
    return false;
  }
}
