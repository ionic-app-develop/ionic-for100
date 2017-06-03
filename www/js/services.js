angular.module('app.services', [])

.factory('app', function() {

	var setMark = function(mark) {
		window.localStorage.mark = angular.toJson(mark);
	};

	var getMark = function() {
		var mark = window.localStorage.mark;
		return mark;
	};

	var removeMark = function() {
		var mark = window.localStorage.mark;
		if(mark)
		   window.localStorage.removeItem(localStorage.mark);
	};

	var setLangkey = function(langkey) {
		window.localStorage.langkey = angular.toJson(langkey);
	};

	var getLangkey = function() {
		var langkey = window.localStorage.langkey;
		return langkey;
	};

	var removeLangkey = function() {
		var langkey = window.localStorage.langkey;
		if(langkey)
		   window.localStorage.removeItem(localStorage.langkey);
	};

    return {
        setMark: setMark,
        getMark: getMark,
        removeMark: removeMark,
        setLangkey: setLangkey,
        getLangkey: getLangkey,
        removeLangkey: removeLangkey
    };
})

.factory('choose', function() {

	var setGrade = function(choose_grade) {
		window.localStorage.choose_grade = angular.toJson(choose_grade);
	};

	var getGrade = function() {
		var grade = window.localStorage.choose_grade;
		return grade;
	};

	var removeGrade = function() {
		var grade = window.localStorage.choose_grade;
		if(grade)
		   window.localStorage.removeItem(localStorage.choose_grade);
	};

    return {
        setGrade: setGrade,
        getGrade: getGrade,
        removeGrade: removeGrade
    };
})

.factory('mymodel', function() {

	var setTime = function(st_time) {
		window.localStorage.st_time = angular.toJson(st_time);
	};

	var getTime = function() {
		var st_time = window.localStorage.st_time;
		return st_time;
	};

	var removeTime = function() {
		var st_time = window.localStorage.st_time;
		if(st_time){
           window.localStorage.removeItem(localStorage.st_time);
		}
	};

	var setNum = function(st_num) {
		window.localStorage.st_num = angular.toJson(st_num);
	};

	var getNum = function() {
		var st_num = window.localStorage.st_num;
		return st_num;
	};

	var removeNum = function() {
		var st_num = window.localStorage.st_num;
		if(st_num){
           window.localStorage.removeItem(localStorage.st_num);
		}
	};

	var setGrade = function(st_grade) {
		window.localStorage.st_grade = angular.toJson(st_grade);
	};

	var getGrade = function() {
		var st_grade = window.localStorage.st_grade;
		return st_grade;
	};

	var removeGrade = function() {
		var st_grade = window.localStorage.st_grade;
		if(st_grade)
		   window.localStorage.removeItem(localStorage.st_grade);
	};

    return {
        setTime: setTime,
        getTime: getTime,
        removeTime: removeTime,
        setNum: setNum,
        getNum: getNum,
        removeNum: removeNum,
        setGrade: setGrade,
        getGrade: getGrade,
        removeGrade: removeGrade
    };
})

.factory('score', function() {

	var setScore = function(totalscore) {
		window.localStorage.totalscore = angular.toJson(totalscore);
	};

	var getScore = function() {
		var totalscore = window.localStorage.totalscore;
		return totalscore;
	};

	var removeScore = function() {
		var totalscore = window.localStorage.totalscore;
		if(totalscore)
		   window.localStorage.removeItem(localStorage.totalscore);
	};

	var setTime = function(totaltime) {
		window.localStorage.totaltime = angular.toJson(totaltime);
	};

	var getTime = function() {
		var totaltime = window.localStorage.totaltime;
		return totaltime;
	};

	var removeTime = function() {
		var totaltime = window.localStorage.totaltime;
		if(totaltime)
		   window.localStorage.removeItem(localStorage.totaltime);
	};

	var setNum = function(totalnum) {
		window.localStorage.totalnum = angular.toJson(totalnum);
	};

	var getNum = function() {
		var totalnum = window.localStorage.totalnum;
		return totalnum;
	};

	var removeNum = function() {
		var totalnum = window.localStorage.totalnum;
		if(totalnum)
		   window.localStorage.removeItem(localStorage.totalnum);
	};

	var setNow = function(now) {
		window.localStorage.now = angular.toJson(now);
	};

	var getNow = function() {
		var now = window.localStorage.now;
		return now;
	};

	var removeNow = function() {
		var now = window.localStorage.now;
		if(now)
		   window.localStorage.removeItem(localStorage.now);
	};

	var setGrade = function(score_grade) {
		window.localStorage.score_grade = angular.toJson(score_grade);
	};

	var getGrade = function() {
		var grade = window.localStorage.score_grade;
		return grade;
	};

	var removeGrade = function() {
		var grade = window.localStorage.score_grade;
		if(grade)
		   window.localStorage.removeItem(localStorage.score_grade);
	};

    return {
    	setScore: setScore,
        getScore: getScore,
        removeScore: removeScore,
        setTime: setTime,
        getTime: getTime,
        removeTime: removeTime,
        setNum: setNum,
        getNum: getNum,
        removeNum: removeNum,
        setNow: setNow,
        getNow: getNow,
        removeNow: removeNow,
        setGrade: setGrade,
        getGrade: getGrade,
        removeGrade: removeGrade
    };
});
