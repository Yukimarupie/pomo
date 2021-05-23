class TasksController < ApplicationController
  def index
    @tasks = Task.all
    @task = Task.new #remote: trueのために追加
  end

  def create
    task = Task.new(task_params)
    task.save!

  end

  def new
    @task = Task.new
  end

  def destory

  end

  private

  def task_params
    # params.require(:task).permit(:name)
  end
end
