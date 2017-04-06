
window._process = function(){
	this.currentIndex = 0;
	this.commit = function(result){
		if(this.currentIndex >= this.fnList.length) return;
		this.stateList[this.currentIndex-1] = result;
		if(this.currentIndex > 0){
			var index = this.currentIndex;
            ++this.currentIndex;
			this.fnList[index](result);
		}
	};

    this.fnList = [];
    this.stateList = [null];
    this.initFnProgress = 0;
    this.next = function(cb){
    	var self = this;
        self.fnList.push(cb);
        setTimeout(function(){
            self.initFnProgress += 1;
            if(self.fnList.length == self.initFnProgress){
                var index = self.currentIndex;
                ++self.currentIndex;
                self.fnList[index]();
            }
        },0);
        return self;
    };
    this.run = this.next;
};

function Process(){
    return new window._Process();
}

export default Process;