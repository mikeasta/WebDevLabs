import { Component, Input } from '@angular/core';
import { DataService, User } from '../services/data.service';
import { DatePreprocessor } from '../services/date.service';
import { StringPreprocessor } from '../services/string_prep.service';

@Component({
  	selector: 'tbody',
  	templateUrl: './friend.component.html',
	  styleUrls: ['./friend.component.less']
})
export class FriendComponent{

	@Input() user: User = new User;
	date_prep: DatePreprocessor = new DatePreprocessor();
	string_prep: StringPreprocessor = new StringPreprocessor();

  	constructor(
		private data: DataService,
  	) {}

	remove_friend () {
		this.data.remove_friend(this.user.id)
		this.data.get_friends()
	}
}
