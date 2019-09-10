import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {account} from "./account";
import {category} from "./category";
import {debtor} from "./debtor";


@Entity("user",{schema:"db_finance" } )
@Index("use_email",["email",],{unique:true})
export class user {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"name"
        })
    name:string;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:50,
        name:"email"
        })
    email:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"password",
        select: false
        })
    password:string;
        

   
    @OneToMany(type=>account, account=>account.fkUser,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    accounts:account[];
    

   
    @OneToMany(type=>category, category=>category.fkUser,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    categorys:category[];
    

   
    @OneToMany(type=>debtor, debtor=>debtor.fkUser,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    debtors:debtor[];
    
}
