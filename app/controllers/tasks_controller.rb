class TasksController < ApplicationController
  before_action :set_task, only: [:destroy, :edit, :update, :done]

  def index
    @tasks = Task.all.reverse
    @task = Task.new #remote: trueのために追加
  end

  def create
    @task = Task.new(task_params)
    respond_to do |format|
      if @task.save!
        format.js #create.js.erbが呼び出される。 フロント側の処理。
      else
        format.js { render :errors }
      end
    end
  end

  def new; end

  def edit
  end

  def update
    respond_to do |format|
      if @task.update!(task_params)
        
        format.json { render :json => @task } #サーバー側の処理
        format.js #create.js.erbが呼び出される。 フロント側の処理。
      else
        format.json { render :new }
        format.js { render :errors }
      end
    end
  end

  def destroy
    @task.destroy!
  end

  def done
    @task.update(:done, true)
  end

  def done_list
    @task.done.all
  end

  private

  def task_params
    params.require(:task).permit(:name, :done)
  end

  def set_task
    @task = Task.find(params[:id])
  end
end

