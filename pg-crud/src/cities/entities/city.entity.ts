import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'cities'}) //Table name for database
export class City {
     @PrimaryGeneratedColumn()
     id:number;
      
     @Column({unique:true})
     name:string;

     @Column({type:'text',nullable:true})
     description :string;

     @Column({type:'boolean',default:true})
     active:boolean;
}
