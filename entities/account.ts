import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user";
import {account_type} from "./account_type";
import {movement} from "./movement";


@Entity("account",{schema:"db_finance" } )
@Index("FK_account_account_type",["fkAccountType",])
@Index("FK_account_person",["fkUser",])
export class account {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"title"
        })
    title:string;
        

    @Column("double",{ 
        nullable:false,
        name:"initial_value"
        })
    initial_value:number;
        

   
    @ManyToOne(type=>user, user=>user.accounts,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'fk_user'})
    fkUser:user | null;


   
    @ManyToOne(type=>account_type, account_type=>account_type.accounts,{ onDelete: 'SET NULL',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_account_type'})
    fkAccountType:account_type | null;


   
    @OneToMany(type=>movement, movement=>movement.fkAccount,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    movements:movement[];
    
}
