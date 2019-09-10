import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {debtor} from "./debtor";
import {movement} from "./movement";


@Entity("debt",{schema:"db_finance" } )
@Index("fk_debt_debtor_1",["fkDebtor",])
export class debt {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        name:"description"
        })
    description:string;
        

    @Column("date",{ 
        nullable:false,
        name:"date"
        })
    date:string;
        

    @Column("decimal",{ 
        nullable:false,
        default: () => "'0'",
        scale:0,
        name:"value"
        })
    value:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:12,
        default: () => "'0'",
        name:"key"
        })
    key:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:10,
        default: () => "'Active'",
        name:"state"
        })
    state:string;
        

   
    @ManyToOne(type=>debtor, debtor=>debtor.debts,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_debtor'})
    fkDebtor:debtor | null;


   
    @OneToMany(type=>movement, movement=>movement.fkDebt,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    movements:movement[];
    
}
