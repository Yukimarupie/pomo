class TasksController < ApplicationController
  before_action :set_task, only: [:destroy]

  def index
    @tasks = Task.all
    @task = Task.new #remote: trueのために追加
  end

  def create
    @task = Task.new(task_params)
    respond_to do |format|
      if @task.save!
        format.json { render :json => @task } #サーバー側の処理
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

  def destroy
    @task.destroy!
  end

  def is_done; end

  private

  def task_params
    params.require(:task).permit(:name)
  end

  def set_task
    @task = Task.find(params[:id])
  end
end

