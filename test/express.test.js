var superagent = require('superagent');
var expect = require('expect.js');
var _und = require('underscore');

describe('Todo list rest api', function(){
    
    it('Create a new list', function(done){
       
       superagent.post(process.env.IP + ':' + process.env.PORT + '/api/list')
            .send({
                name: 'new list'
            })
            .end(function(e, res){
                expect(res.body.length).to.be.greaterThan(0);
                expect(_und.first(res.body, function(d){ return d.name == 'new list';})).not.to.equal(undefined);
                done();
            });
    });
    
    it('Get all lists', function(done){
        superagent.get(process.env.IP + ':' + process.env.PORT + '/api/list')
            .send()
            .end(function(e, res){
                var lists = res.body;
                expect(lists.length).to.be.greaterThan(0);
                done();
            });
    });
    
    it ('Create a list and delete it', function(done){
        var listId = '';
        superagent.post(process.env.IP + ':' + process.env.PORT + '/api/list')
            .send({
                name: 'new list'
            })
            .end(function(e, res){
                console.log(res.body);
                listId = res.body._id;
                superagent.del(process.env.IP + ':' + process.env.PORT + '/api/list/' + listId)
                    .send()
                    .end(function(e, res){
                        console.log(res.body);
                        console.log('status : ' + res.status)
                        expect(res.status).to.be.equal(200);
                        done();
                    }); 
            });
        
    });
    
    it('Create a list, add an item', function(done){
        var listId = '';
        superagent.post(process.env.IP + ':' + process.env.PORT + '/api/list')
            .send({
                name: 'new list'
            })
            .end(function(e, res){
                console.log(res.body);
                listId = res.body._id;
                superagent.post(process.env.IP + ':' + process.env.PORT + '/api/item')
                    .send({
                        text: 'new item',
                        checked: false,
                        listId: listId
                    })
                    .end(function(e, res){
                        console.log(res.body);
                        console.log('status : ' + res.status)
                        expect(res.body.text).to.be.equal('new item');
                        expect(res.body.checked).to.be.equal(false);
                        done();
                    });
            });
        
    });
    
    
});