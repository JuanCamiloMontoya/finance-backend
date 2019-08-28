import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { user } from "./user";
import { debt } from "./debt";


@Entity("debtor", { schema: "db_finance" })
@Index("fk_debtor_user_1", ["fkUser",])
export class debtor {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;


    @Column("varchar", {
        nullable: false,
        length: 50,
        name: "name"
    })
    name: string;


    @Column("varchar", {
        nullable: false,
        length: 10,
        default: () => "'active'",
        name: "state"
    })
    state: string;



    @ManyToOne(type => user, user => user.debtors, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'fk_user' })
    fkUser: user | null;



    @OneToMany(type => debt, debt => debt.fkDebtor, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    debts: debt[];

}
