import Alert from 'react-s-alert';
// MobX
import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// Store
import store from "store";
// GraphQL
import client from "graphql/client";
import CREATE_BOARD_MUTATION from "graphql/mutations/boards/createBoard.mutation";
import DELETE_BOARD_MUTATION from "graphql/mutations/boards/deleteBoard.mutation";
import BOARD_SUBSCRIBE_ON_TASK_CREATE from "graphql/subscriptions/boards/boardSubscribeOnTaskCreate.subscription";
import BOARD_SUBSCRIBE_ON_TASK_UPDATE from "graphql/subscriptions/boards/boardSubscribeOnTaskUpdate.subscription";
import BOARD_SUBSCRIBE_ON_TASK_DELETE from "graphql/subscriptions/boards/boardSubscribeOnTaskDelete.subscription";
// Socket
import webSocket from 'graphql/websocket';
// Models
import BoardModel from "models/boards/Board.model";


const Boards = {
	all: types.optional(types.map(BoardModel), {})
};


const actions = (self)=> {
    return {

    	createMutation: async ({ authorId, name, description, background })=> {
			return client.mutate({
				variables: { authorId, name, description, background },
				mutation: CREATE_BOARD_MUTATION
			}).catch((e)=> console.log("CREATE_BOARD_MUTATION", e));
		},


		deleteMutation: async (boardId)=> {
    		const board = self.all.get(boardId);

			// Need to remove all [Tasks] of Board
			for(const taskInfo of board.tasks) {
				await store.tasks.deleteMutation({ taskId: taskInfo.id });
			}

			// Need to remove all [Lists] of Board
    		for(const listInfo of board.lists) {
    			await store.lists.deleteMutation({ listId: listInfo.id });
			}

    		// TODO: re fetch labels -> tasks ?

			return client.mutate({
				variables: { boardId },
				mutation: DELETE_BOARD_MUTATION
			}).catch((e)=> console.log("DELETE_BOARD_MUTATION", e));
		},


		create(board = {}) {
			if(self.all.has(board.id)) return self.all.get(board.id).update(board);
			runInAction(`BOARD-CREATE-SUCCESS ${board.id}`, ()=> {
				self.all.set(board.id,  { ...board, __type: "Board" });
                self.subscribeTaskCreate(board.id);
                self.subscribeTaskUpdate(board.id);
                self.subscribeTaskDelete(board.id);
            });
		},


		update: (newBoard)=> {
			runInAction(`BOARDS-UPDATE-SUCCESS`, ()=> {
				const oldBoard = self.all.get(newBoard.id);
				const updatedBoard = Object.assign(oldBoard, newBoard);
				self.all.set(updatedBoard.id, updatedBoard);
			});
		},


		delete(boardId) {
			if(!self.all.has(boardId)) return runInAction(`BOARD-DELETE-WARNING (no such board ${boardId})`, ()=> {});
			runInAction(`BOARD-DELETE-SUCCESS ${boardId}`, ()=> {
				self.all.delete(boardId);
				Alert.success("Board was deleted successfully!");
			});
		},


        subscribeTaskCreate(boardId) {
            webSocket.send(BOARD_SUBSCRIBE_ON_TASK_CREATE({ boardId }));
		},


		subscribeTaskUpdate(boardId) {
			webSocket.send(BOARD_SUBSCRIBE_ON_TASK_UPDATE({ boardId }));
		},


        subscribeTaskDelete(boardId) {
            webSocket.send(BOARD_SUBSCRIBE_ON_TASK_DELETE({ boardId }));
        }
    };
};


export default types.model('Boards', Boards).actions(actions);
