import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {category} from "./category";


@Entity("movement_type",{schema:"db_finance" } )
export class movement_type {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"name"
        })
    name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:10,
        default: () => "'active'",
        name:"state"
        })
    state:string;
        

   
    @OneToMany(type=>category, category=>category.fkMovementType,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    categorys:category[];
    
}
