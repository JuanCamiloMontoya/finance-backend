import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {category} from "./category";
import {account} from "./account";
import {debt} from "./debt";


@Entity("movement",{schema:"db_finance" } )
@Index("FK_movement_account",["fkAccount",])
@Index("FK_movement_category",["fkCategory",])
@Index("fk_movement_debt_1",["fkDebt",])
export class movement {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("double",{ 
        nullable:false,
        name:"value"
        })
    value:number;
        

    @Column("datetime",{ 
        nullable:false,
        default: () => "CURRENT_TIMESTAMP",
        name:"date"
        })
    date:Date;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"description"
        })
    description:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:10,
        name:"state"
        })
    state:string;
        

   
    @ManyToOne(type=>category, category=>category.movements,{ onDelete: 'SET NULL',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_category'})
    fkCategory:category | null;


   
    @ManyToOne(type=>account, account=>account.movements,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_account'})
    fkAccount:account | null;


   
    @ManyToOne(type=>debt, debt=>debt.movements,{ onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_debt'})
    fkDebt:debt | null;

}
