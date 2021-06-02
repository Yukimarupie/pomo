class TasksController < ApplicationController
  before_action :set_task, only: [:destroy, :edit, :update, :done]

  def index
    @tasks_undone = Task.where(done: false)
    #今日の日付より大きいもの
    @tasks_done = Task.where(done: true).where('created_at >= ?', Time.current.beginning_of_day).order(id: "DESC")
    @task = Task.new #remote: trueのために追加
  end

  def create
    @task = Task.new(task_params)
    respond_to do |format|
      if @task.save!
        format.js #create.js.erbが呼び出される。 
      else
        format.js { render :errors }
      end
    end
  end

  def new; end

  def done
    @task.update(done: true) #doneをtrueに。 done.js.erbは指定せずとも自動で呼び出される
  end

  def update
    # binding.pry
    respond_to do |format|
      if @task.update!(task_params)
        # binding.pry
        format.js #update.js.erbが呼び出される。 フロント側の処理。
      else
        format.js { render :errors }
      end
    end
  end

  def destroy
    @task.destroy!
  end


  private

  def task_params
    params.require(:task).permit(:name, :done)
  end

  def set_task
    # binding.pry
    @task = Task.find(params[:id])
  end
end

