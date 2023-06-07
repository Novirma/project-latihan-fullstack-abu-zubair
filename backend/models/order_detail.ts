import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { orders } from './orders';

export interface order_detailAttributes {
  id?: number;
  order_id?: number;
  product_id?: number;
  quantity?: number;
  createdat?: Date;
  updatedat?: Date;
}

@Table({ tableName: 'order_detail', schema: 'public', timestamps: false })
export class order_detail
  extends Model<order_detailAttributes, order_detailAttributes>
  implements order_detailAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('order_detail_id_seq'::regclass)"),
  })
  @Index({ name: 'order_detail_pkey', using: 'btree', unique: true })
  id?: number;

  @ForeignKey(() => orders)
  @Column({ allowNull: true, type: DataType.INTEGER })
  order_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  product_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  quantity?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdat?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  updatedat?: Date;

  @BelongsTo(() => orders)
  order?: orders;
}
