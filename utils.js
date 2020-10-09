
function createResult(error,data){

    return error? createError(error):createSuccess(data)
}
function createError(error){
    const result={}
    result['status']='error'
    result['error']=error
    return result
}
function createSuccess(data){
    
    const result={}
    result['status']='error'
    result['data']=data
    return result
}
module.exports={
    createResult:createResult,
    createError:createError,
    createSuccess:createSuccess
}