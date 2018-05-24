import { runInAction } from "mobx";
import { types } from 'mobx-state-tree';
// GraphQL
import client from "graphql/client";
import CREATE_BOARD_MUTATION from "graphql/mutations/boards/createBoard.mutation";
import DELETE_BOARD_MUTATION from "graphql/mutations/boards/deleteBoard.mutation";
// Models
import BoardModel from "models/boards/Board.model";
import webSocket from 'graphql/websocket'

const Boards = {
	all: types.optional(types.map(BoardModel), {})
};


const actions = (self)=> {
    return {

    	creteMutation: async ({ authorId, name, description })=> {
			const response = await client.mutate({
				variables: { authorId, name, description },
				mutation: CREATE_BOARD_MUTATION
			});
			console.log("creteMutation mutation: ", response);
			self.create(response.data.createBoard);
		},


		deleteMutation: (boardId)=> {
			client.mutate({
				variables: { boardId },
				mutation: DELETE_BOARD_MUTATION
			});
		},

		create(board = {}) {
			runInAction(`BOARD-CREATE-SUCCESS`, ()=> {
				self.all.set(board.id, board);
                self.subscribeTaskCreate(board.id);
                self.subscribeTaskDelete(board.id);
            });
		},

        subscribeTaskCreate(boardId) {
            const taskCreateSubscriptionMessage = {
                id: 'TASK_CREATE',
                type: 'subscription_start',
                query: `
					subscription Task {
						Task(filter: {
							mutation_in: [CREATED]
							node: {
								board: {
									id: "${boardId}"
								}
							}
						}){
							mutation
							previousValues {
								id
							}
							node {
								id
								title
								description
								author {
									id
								}
								board { 
									id
								}
								list {
									id
								}
								labels {
									id
								}
							}
						}
            }
			`
            };
            webSocket.send(JSON.stringify(taskCreateSubscriptionMessage));
		},

        subscribeTaskDelete(boardId) {
            const taskDeleteSubscriptionMessage = {
                id: 'TASK_DELETED',
                type: 'subscription_start',
                query: `
					subscription Task {
						Task(filter: {
							mutation_in: [DELETED]
							node: {
								board: {
									id: "${boardId}"
								}
							}
						}){
							mutation
							previousValues {
								id
							}
						}
					}
				`
            };
            webSocket.send(JSON.stringify(taskDeleteSubscriptionMessage));
        },

        update: (newBoard)=> {
            runInAction(`BOARDS-UPDATE-SUCCESS`, ()=> {
                const oldBoard = self.all.get(newBoard.id);
                const updatedBoard = Object.assign(oldBoard, newBoard);
                self.all.set(updatedBoard.id, updatedBoard);
            });
        },

        delete(boardId) {
			runInAction(`BOARD-DELETE-SUCCESS`, ()=> {
				self.all.delete(boardId);
			});
		}

    };
};


export default types.model('Boards', Boards).actions(actions);
