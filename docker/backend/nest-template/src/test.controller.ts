import { Item } from './test.interface';
import { Controller, Post, Body, Get, Put, Param, Delete, Header } from '@nestjs/common';
import { TestService } from './test.service';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';


@Controller('test')
export class TestController {

	constructor(private testService: TestService) {}
	@Post()
	create(@Body() post: Item): Observable<Item> {
		console.log(post);
		return this.testService.createPost(post)
	}

	@Get()
	findAll(): Observable<Item[]> {
		return this.testService.findAllPosts();
	}
	
	// @Get()
	// findPostById(): Observable<Item> {
	// 	return this.testService.findPostById();
	// }
	
	// @Get()
	// @Header('Access-Control-Allow-Origin', '*')
	// getData(): Item[] {
	//   // Renvoyer des données fictives à des fins de démonstration
	//   const items: Item[] = [
	// 	{ id: 1, name: 'Item 1' }, // a connecter a la DB
	// 	{ id: 2, name: 'Item 2' }, // a connecter a la DB
	// 	{ id: 3, name: 'Item 3' }, // a connecter a la DB
	//   ];
	//   return items;
	// }

	@Put(':id')
	update( @Param('id') id: number, @Body() item: Item): Observable<UpdateResult> {
		console.log("id0: " + id);
		console.log(item);
		return this.testService.updatePost(id, item)
	}

	@Delete(':id')
	delete(@Param('id') id: number) : Observable<DeleteResult> {
		return this.testService.deletePost(id);
	}
}