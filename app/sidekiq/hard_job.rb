class HardJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something
    Rails.logger.info("Performing hard job with arguments: #{args.inspect}")
  end
end
