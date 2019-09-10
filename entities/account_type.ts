import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {account} from "./account";


@Entity("account_type",{schema:"db_finance" } )
export class account_type {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"name"
        })
    name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:10,
        default: () => "'Active'",
        name:"state"
        })
    state:string;
        

   
    @OneToMany(type=>account, account=>account.fkAccountType,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    accounts:account[];
    
}
