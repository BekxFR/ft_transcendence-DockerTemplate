import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { TestPostEntity } from './test.entity';
import { Item } from './test.interface';

@Injectable()
export class TestService {
	constructor(
		@InjectRepository(TestPostEntity)
		private readonly testPostRepository: Repository<TestPostEntity>
	) {}

	createPost(item: Item): Observable<Item> {
		console.log(item.name);
		return from(this.testPostRepository.save(item));
	}

	findAllPosts(): Observable<Item[]> {
		return from(this.testPostRepository.find());
	}

	// findPostById(id: number): Observable<Item | null> {
    //     let str = from(this.testPostRepository.findOne({
    //         where: {
    //             id: 1,
    //         }
    //     }));
    //     return str;
    // }

	updatePost(id: number, item: Item ) : Observable<UpdateResult> {
		console.log(item);
		console.log("id: " + id);
		return from(this.testPostRepository.update(id, item))
	}

	deletePost(id: number): Observable<DeleteResult> {
		return from(this.testPostRepository.delete(id))
	}
}