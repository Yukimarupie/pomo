class TasksController < ApplicationController
  def index
    @tasks = Task.all
    @task = Task.new #remote: trueのために追加
  end

  def create
    @task = Task.new(task_params)
    respond_to do |format|
      if @task.save!
        format.json {render :json => @task } #サーバー側の処理
        format.js #create.js.erbが呼び出される。 フロント側の処理。
      else
        format.json { render :new }
        format.js { render :errors }
      end
    end
  end

  def new
    @task = Task.new
  end

  def destory

  end

  private

  def task_params
    params.require(:task).permit(:name)
  end
end

