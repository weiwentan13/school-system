# Generated by Django 3.1.7 on 2021-03-06 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20210306_2024'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='year',
            field=models.CharField(choices=[('G1', 'Grade 1'), ('G2', 'Grade 2'), ('G3', 'Grade 3'), ('G4', 'Grade 4'), ('G5', 'Grade 5'), ('G6', 'Grade 6')], default='G1', max_length=2),
        ),
        migrations.AddField(
            model_name='teacher',
            name='year_handled',
            field=models.CharField(choices=[('G1', 'Grade 1'), ('G2', 'Grade 2'), ('G3', 'Grade 3'), ('G4', 'Grade 4'), ('G5', 'Grade 5'), ('G6', 'Grade 6')], default='G1', max_length=2),
        ),
    ]
