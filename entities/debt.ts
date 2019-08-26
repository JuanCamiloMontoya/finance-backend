import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {debtor} from "./debtor";
import {movement} from "./movement";


@Entity("debt",{schema:"db_finance" } )
@Index("fk_debt_debtor_1",["fkDebtor",])
export class debt {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        name:"desciption"
        })
    desciption:string;
        

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
        length:10,
        default: () => "'1'",
        name:"state"
        })
    state:string;
        

   
    @ManyToOne(type=>debtor, debtor=>debtor.debts,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'fk_debtor'})
    fkDebtor:debtor | null;


   
    @OneToMany(type=>movement, movement=>movement.fkDebt,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    movements:movement[];
    
}
