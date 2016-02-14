angular.module('movie-search',[])
.factory('movieService',[ '$http',function($http){
	return {
		getAll:getAll,
		getGeneral:getGeneral,
		getByActor:getByActor,
		getByTitle:getByTitle,
		getByYear:getByYear,
		getByGenre:getByGenre
	}

	function getAll(){
		return $http.get('/movie');
	}
	function getGeneral(query){
		return $http.get('/getGeneral/'+query);
	}	
	function getByActor(query){
		return $http.get('/getByActor/'+query);
	}
	function getByTitle(query){
		return $http.get('/getByTitle/'+query);
	}
	function getByYear(query){
		return $http.get('/getByYear/'+query);
	}	
	function getByGenre(query){
		return $http.get('/getByGenre/'+query);
	}		
}])

.controller('appController',['$scope','movieService','$timeout',function($scope,movieService,$timeout){
	var infoMessage = {
		completeFields: 'Please Complete Search Field :)',
		noMovies: 'Your query had no results :('	
	}
	$scope.movie = '';
	$scope.notifyMessage = ''
	$scope.movieSet = [];
	$scope.selectedMovie = '';
	$scope.progress=false;
	init();

	function init(){
		$scope.progress=true;
		movieService.getAll()
		.then(function(response){
			$scope.movieSet = response.data;
			$scope.progress=false;
		});		
	}
	
	$scope.setSelectedMovie = function(movie){
		$scope.selectedMovie = movie;
		$('#detailModal').modal('show'); 
	}
	
	$scope.findGeneral = function(){
		if($scope.searchGeneral){
			$scope.progress=true;
			if($scope.searchGeneral.length!==1){
				movieService.getGeneral($scope.searchGeneral)
				.then(function(response){
					$scope.movieSet = response.data;
					$scope.progress=false;
				})
			}
		}else{
			init()
		}
	}	
	
	$scope.findTitle = function(){
		if($scope.searchTitle){
			if($scope.searchTitle.length!==1){
				$scope.progress=true;
				movieService.getByTitle($scope.searchTitle)
				.then(function(response){
					$scope.movieSet = response.data;
					$scope.progress=false;
				})					
			}
		}else{
			init()
		}
	}
	
	$scope.findActor = function(){
		if($scope.searchActor){
			if($scope.searchActor.length!==1){
				$scope.progress=true;
				movieService.getByActor($scope.searchActor)
				.then(function(response){
					$scope.movieSet = response.data;
					$scope.progress=false;
				})	
			}
		
		}else{
			init()
		}
	}
	
	$scope.findYear = function(){
		if($scope.searchYear){

			if(!isNaN($scope.searchYear)){
				if($scope.searchYear.length===4){
					$scope.progress=true;
					movieService.getByYear($scope.searchYear)
					.then(function(response){
						$scope.movieSet = response.data;
						$scope.progress=false;
					})						
				}else{
					$scope.notifyMessage = 'Please use a valid year (aaaa)'
					$timeout(function(){
						$scope.notifyMessage = ''
					},2000)
						
				}				
			}else{
				$scope.notifyMessage = 'Please Use Only Numbers'
				$timeout(function(){
					$scope.notifyMessage = ''
				},2000)
			}

			
			
		}else{
			init()
		}
	}
	
	$scope.setSelected = function(genre){
		if(genre){
			$scope.progress=true;
			movieService.getByGenre(genre)
			.then(function(response){
				$scope.movieSet = response.data;
				$scope.progress=false;
			})							
		}else{
			init()
		}
	}
	
	$scope.refresh = function(){
		init();
	}
	
}])



