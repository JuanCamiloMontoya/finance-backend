import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {movement_type} from "./movement_type";
import {user} from "./user";
import {movement} from "./movement";


@Entity("category",{schema:"db_finance" } )
@Index("FK_category_category",["fkCategory",])
@Index("fk_category_movement_type_1",["fkMovementType",])
@Index("fk_category_user_1",["fkUser",])
export class category {

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
        

   
    @ManyToOne(type=>category, category=>category.categorys,{ onDelete: 'SET NULL',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_category'})
    fkCategory:category | null;


   
    @ManyToOne(type=>movement_type, movement_type=>movement_type.categorys,{ onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_movement_type'})
    fkMovementType:movement_type | null;


   
    @ManyToOne(type=>user, user=>user.categorys,{ onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_user'})
    fkUser:user | null;


   
    @OneToMany(type=>category, category=>category.fkCategory,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    categorys:category[];
    

   
    @OneToMany(type=>movement, movement=>movement.fkCategory,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    movements:movement[];
    
}
